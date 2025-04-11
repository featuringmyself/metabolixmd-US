import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import BlurOverlay from '../BlurOverlay';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeightCalculation = ({ data: initialData, onNext, onBack }) => {
  // Use state to manage data to ensure component re-renders when data changes
  const [formData, setFormData] = useState(initialData || {});
  const [storedWeight, setStoredWeight] = useState(null);
  const [weightError, setWeightError] = useState(false);

  // Initialize data from localStorage on component mount
  useEffect(() => {
    // First try to load from UserInfoForm_data (more complete data)
    const savedFormData = localStorage.getItem('UserInfoForm_data');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prevData => ({
          ...prevData,
          weight: parsedData.weight ? Number(parsedData.weight) : prevData.weight,
          height: parsedData.height ? parsedData.height : prevData.height
        }));
        
        if (parsedData.weight) {
          setStoredWeight(Number(parsedData.weight));
          setWeightError(false);
        }
      } catch (error) {
        console.error('Error parsing UserInfoForm_data:', error);
      }
    } else {
      // Fallback to userWeight if UserInfoForm_data is not available
      const savedWeight = localStorage.getItem('userWeight');
      if (savedWeight) {
        const parsedWeight = Number(savedWeight);
        setStoredWeight(parsedWeight);
        setFormData(prevData => ({
          ...prevData,
          weight: parsedWeight
        }));
        setWeightError(false);
      } else if (!formData.weight) {
        setWeightError(true);
      }
    }
  }, []);

  // Update localStorage when weight changes
  useEffect(() => {
    if (formData.weight && !isNaN(formData.weight)) {
      localStorage.setItem('userWeight', formData.weight.toString());
      setStoredWeight(formData.weight);
      setWeightError(false);
    }
  }, [formData.weight]);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [lossCount, setLossCount] = useState(20);
  const [chartValue, setChartValue] = useState("");
  const [isChartReady, setIsChartReady] = useState(false);

  const handleContinue = () => {
    onNext(formData);
  };

  // Calculations for BMI
  const calculateBMI = () => {
    // Early return with detailed logging for debugging
    if (!formData?.height?.feet || !formData?.height?.inches || !formData?.weight) {
      console.log('BMI calculation failed:', { 
        heightFeet: formData?.height?.feet, 
        heightInches: formData?.height?.inches, 
        weight: formData?.weight 
      });
      return 0;
    }
    
    const totalInches = parseInt(formData.height.feet) * 12 + parseInt(formData.height.inches);
    const heightInMeters = totalInches * 0.0254;
    const weightInKg = formData.weight * 0.453592;
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    console.log('BMI calculated:', bmi);
    return bmi;
  };

  const bmiValue = calculateBMI();
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  useEffect(() => {
    if (formData?.weight) {
      let Count = formData.weight * 0.18;
      setLossCount(Count);
      setChartValue({
        series: [{
          name: 'Weight',
          data: [formData.weight, formData.weight - Count] // Example data points
        }],
      options: {
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: false, // Disable toolbar
          },
          zoom: {
            enabled: false // Disable zoom
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        stroke: {
          curve: 'smooth',
          width: 3,
          colors: ['#53857d']
        },
        grid: {
          show: false // Remove background grid lines
        },
        xaxis: {
          show: true, // Show x-axis
          title: {
            text: 'Year', // Set x-axis title to "Year"
            style: {
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'inherit'
            }
          },
          categories: [currentYear.toString(), nextYear.toString()], // Add years as example labels
          labels: {
            style: {
              fontSize: '14px',
              fontFamily: 'inherit'
            }
          }
        },
        yaxis: {
          show: true, // Show y-axis
          labels: {
            style: {
              fontSize: '14px',
              fontFamily: 'inherit'
            },
            formatter: function(val) {
              return val.toFixed(0) + ' lbs';
            }
          }
        },
        dataLabels: {
          enabled: false // Disable data labels
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
            colorStops: [{
              offset: 0,
              color: '#53857d',
              opacity: 0.7
            },
            {
              offset: 100,
              color: '#fff',
              opacity: 0.9
            }]
          }
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'inherit'
          }
        }
      }
    });
    setIsChartReady(true);
    }
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center gap-4 p-4"
    >
      {bmiValue > 25 ? (
        <>
          <h2 className='md:text-4xl text-3xl text-center font-semibold text-zinc-800 md:m-12 m-4 mb-12 antialiased'>Exciting news, you could lose <br />{' '}
          {lossCount?.toFixed(1)} pounds!</h2>
          <BlurOverlay>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[3vw] shadow-lg md:p-6 p-4">
              {isChartReady && chartValue && (
                <div className="w-full flex md:flex-row flex-col justify-between relative">
                  <div className='md:relative mt-12 md:w-[50%] w-full'>
                    <Chart
                      options={chartValue.options}
                      series={chartValue.series}
                      type="area"
                      height={350} 
                    />
                    <div className='text-right absolute right-0 top-3'>
                      <h2 className='text-4xl font-bold'>{formData.weight} lbs</h2>
                      <h3 className='text-2xl text-green-600'>↓ {lossCount.toFixed(1)} lbs</h3>
                    </div>
                  </div>
                  
                  <div className='md:w-[40%] md:mt-0 mt-12 justify-center items-center flex flex-col'>
                    
                    This graph shows that with GLP-1 and GLP-1/GIP agonist medication, you can expect to lose around 15 - 20% over the course of a year
                    <div className="w-full h-0.5 bg-zinc-200 my-12"></div>
                    <div className='flex justify-evenly items-start flex-col gap-2'>
                      <h4 className='text-md'>Your treatment options</h4>
                      <h2 className='text-xl font-semibold'>Semaglutide, Tirzeptaide</h2>
                      <p className='text-zinc-400 text-xs'>If prescripted, medications will be delivered directly to you within a week</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={onBack}
                  className="hover:bg-gray-200 px-8 py-3 text-gray-700 font-semibold rounded-full border border-gray-300"
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </BlurOverlay>
        </>
      ) : (
        <BlurOverlay>
          <div className="w-full max-w-4xl mx-auto bg-white rounded-[3vw] shadow-lg md:p-6 p-4">
            
            <h2 className='md:text-4xl text-3xl text-center font-semibold text-zinc-800 md:m-12 m-4 mb-12 antialiased'>
              Thank you for reaching out to us.
            </h2>
            <div className='text-center text-md text-gray-600 '>
              <h3 className='text-lg tracking-wider font-medium text-gray-800 mb-10'>We regret to inform you that, based on your current BMI, you do not meet the eligibility criteria for GLP-1 medication.</h3> 
              <p> We encourage you to continue prioritizing your health and well-being. If you have any further questions or need additional guidance, please feel free to contact us.
              Wishing you the best of health.</p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/contact-us"
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </BlurOverlay>
      )}
    </motion.div>
  );
};

export default WeightCalculation;
