import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeightCalculation = ({ data, onNext }) => {
  const router = useRouter();
  const [lossCount, setLossCount] = useState(20);
  const [chartValue, setChartValue] = useState("");
  const [isChartReady, setIsChartReady] = useState(false);

  const handleContinue = () => {
    onNext({}, "basicsUserInfo");
  };
  // Calculations for BMI
  const totalInches = parseInt(+data?.height.feet) * 12 + parseInt(+data?.height.inches);
  const heightInMeters = totalInches * 0.0254;
  const weightInKg = data.weight * 0.453592;
  const bmiValue = weightInKg / (heightInMeters * heightInMeters);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  useEffect(() => {
    let Count = data?.weight * 0.18;
    setLossCount(Count);
    setChartValue({
      series: [{
        name: 'Weight',
        data: [data.weight, data.weight - Count] // Example data points
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
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        tooltip: {
          enabled: true, // Enable tooltip
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          },
          y: {
            formatter: function(val) {
              return val + ' lbs';
            }
          }
        },
        colors: ['#365d56'], // Set chart color
        markers: {
          size: 6,
          strokeWidth: 0,
          hover: {
            size: 9
          }
        }
      }
    });
    
    // Add a small delay to ensure smooth animation when chart renders
    setTimeout(() => {
      setIsChartReady(true);
    }, 300);
    
  }, [data]);
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  return (
    <>
      {
        (bmiValue > 25) ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="w-full p-5 md:p-0 md:max-w-fit mx-auto"
          >
            <div className="w-full md:w-[500px]">
              <motion.p 
                variants={fadeIn}
                className='mb-5 text-lg leading-relaxed'
              >
                This graph shows that with GLP-1 and GLP-1/GIP agonist medications,
                you can expect to lose around 15 - 20% over the course of a year.
              </motion.p>
              
              <motion.div variants={scaleIn}>
                <h2 className='text-5xl font-bold text-zinc-800'>
                  {data?.weight - lossCount} lbs
                </h2>
                <p className='text-primary text-3xl font-semibold flex items-center gap-3 mt-2'>
                  <motion.svg 
                    animate={{ 
                      y: [0, 5, 0],
                      scale: [1, 1.1, 1],
                      filter: ["drop-shadow(0px 0px 0px #365d56)", "drop-shadow(0px 2px 3px #365d56)", "drop-shadow(0px 0px 0px #365d56)"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#365d56" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-arrow-down"
                  >
                    <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                  </motion.svg>
                  {lossCount} lbs
                </p>
              </motion.div>

              {/* Chart */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isChartReady ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className='mt-6 bg-white p-4 rounded-xl shadow-sm'
              >
                {
                  chartValue &&
                  <Chart options={chartValue?.options} series={chartValue?.series} type="area" height={350} />
                }
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-8">
                <h3 className='text-2xl font-bold mb-3'>Your treatment options</h3>
                <p className='text-zinc-600 leading-relaxed'>
                  <span className='text-zinc-800 font-semibold'>
                    Semaglutide, Tirzepatide
                  </span>
                  <br />
                  If prescribed, medications will be delivered directly to you within a week.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#2e4f49" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`mt-8 p-3 text-white w-full py-3 font-semibold rounded-full bg-primary transition-all duration-300 shadow-sm hover:shadow-md`}
                  onClick={handleContinue} 
                  aria-label='continue'
                >
                  Continue
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="w-full p-5 md:p-0 md:max-w-fit mx-auto"
          >
            <div className="w-full md:w-[500px]">
              <motion.h1 
                variants={scaleIn} 
                className='text-3xl mb-6 text-primary font-semibold'
              >
                Thank you for reaching out to us.
              </motion.h1>
              <motion.p variants={fadeIn} className='mt-5 text-lg font-normal leading-relaxed'>
                We regret to inform you that, based on your current BMI, you do not meet the eligibility criteria for GLP-1 medication.
              </motion.p>
              <motion.p variants={fadeIn} className='mt-5 text-lg font-normal leading-relaxed'>
                We encourage you to continue prioritizing your health and well-being. If you have any further questions or need additional guidance, please feel free to contact us.
              </motion.p>
              <motion.p variants={fadeIn} className='mt-5 text-lg font-normal mb-5 leading-relaxed'>
                Wishing you the best of health, <br />
                <b>The MetabolixMD Team</b>
              </motion.p>
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: "#2e4f49" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/")} 
                className='mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer'
              >
                Continue
              </motion.div>
            </div>
          </motion.div>
        )
      }
    </>
  );
};

export default WeightCalculation;
