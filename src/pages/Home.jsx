import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  ShieldAlert, 
  Stethoscope, 
  BookOpen, 
  Brain, 
  Dumbbell, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HOME_FEATURES = [
  { 
    icon: ShieldAlert, 
    color: 'text-blue-500', 
    title: 'Healing', 
    path: '/healing',
    description: 'Personalized healing strategies'
  },
  { 
    icon: Stethoscope, 
    color: 'text-green-500', 
    title: 'Health', 
    path: '/health',
    description: 'Comprehensive health tracking'
  },
  { 
    icon: BookOpen, 
    color: 'text-red-500', 
    title: 'Information', 
    path: '/information',
    description: 'Medical knowledge hub'
  },
  // { 
  //   icon: HeartPulse, 
  //   color: 'text-purple-500', 
  //   title: 'Heart Rate', 
  //   path: '/heart-rate',
  //   description: 'Advanced cardiac monitoring'
  // },
  { 
    icon: Brain, 
    color: 'text-indigo-500', 
    title: 'Wellness', 
    path: '/wellness',
    description: 'Holistic well-being approach'
  },
  { 
    icon: Dumbbell, 
    color: 'text-teal-500', 
    title: 'Exercise', 
    path: '/exercise',
    description: 'Personalized fitness plans'
  },
  { 
    icon: Users, 
    color: 'text-pink-500', 
    title: 'Doctors', 
    path: '/doctors',
    description: 'Connect with experts'
  }
];

const Home = ({ showLogin }) => {
  const { setShowLogin } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden relative">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <section className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-blue-900 mb-4 tracking-tight">
            Health <span className="text-blue-600">AI</span> Companion
          </h1>
          <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
            Your intelligent healthcare assistant, providing personalized insights and support.
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="group flex items-center justify-center mx-auto space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <span>Get Started</span>
            <ArrowRight className="transform transition-transform group-hover:translate-x-1" />
          </button>
        </section>

        <section className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {HOME_FEATURES.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.path}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`relative group flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 
                ${hoveredFeature === index 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:scale-105 hover:shadow-xl'}
              `}
            >
              <div className={`mb-4 ${feature.color} bg-blue-50 p-4 rounded-full group-hover:animate-bounce`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-blue-700 text-center opacity-70">
                {feature.description}
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-blue-500" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;