import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import BlurOverlay from '../BlurOverlay';
import AuthGate from '../AuthGate';

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
            opacityTo: 0.9,
            stops: [0, 90, 100]
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
  }, [data]);

  return (
    <AuthGate>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex flex-col items-center justify-center gap-4 p-4"
      >
        <BlurOverlay>
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Weight Loss Projection</h2>
              <p className="text-gray-600">
                Based on your current weight of {data?.weight} lbs, you could lose approximately{' '}
                {lossCount?.toFixed(1)} lbs in the next year with our program.
              </p>
            </div>

            {isChartReady && chartValue && (
              <div className="w-full h-[400px]">
                <Chart
                  options={chartValue.options}
                  series={chartValue.series}
                  type="area"
                  height={350}
                />
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={handleContinue}
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </BlurOverlay>
      </motion.div>
    </AuthGate>
  );
};

export default WeightCalculation;
