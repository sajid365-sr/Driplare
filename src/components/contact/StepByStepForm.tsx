import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, Check, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  {
    id: 1,
    title: "The Identity",
    description: "Let's get to know you",
    fields: ["name", "company", "email"]
  },
  {
    id: 2,
    title: "The Challenge",
    description: "What brings you here?",
    fields: ["service"]
  },
  {
    id: 3,
    title: "The Vision",
    description: "Tell us about your project",
    fields: ["details"]
  }
];

interface FormData {
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
}

export function StepByStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    service: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle typing state for button glow effect
  useEffect(() => {
    const hasAnyInput = Object.values(formData).some(value => value.trim() !== '');
    setIsTyping(hasAnyInput);
  }, [formData]);

  // Validate email when it changes
  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('[ERR: INVALID_COMM_PATH]');
    } else {
      setEmailError('');
    }
  }, [formData.email]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    const currentStepData = steps[currentStep - 1];
    return currentStepData.fields.every(field => {
      if (field === 'details') return formData.details.length > 10;
      return formData[field as keyof FormData].trim() !== '';
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted successfully! We\'ll be in touch soon.');
      // Reset form
      setCurrentStep(1);
      setFormData({
        name: '',
        company: '',
        email: '',
        service: '',
        details: ''
      });
    }, 2000);
  };

  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
              <span>DYNAMIC_MULTI_STEP</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
              The Discovery Form
            </h2>
            <p className="text-lg text-[#0A0A0A]/70 font-montserrat">
              Step through our intelligent intake process to get your project started.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    step.id <= currentStep
                      ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                      : 'bg-white text-[#0A0A0A] border-[#E5E5E5]'
                  }`}>
                    {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-[#E5E5E5] mx-2"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full bg-[#E5E5E5] rounded-full h-2">
              <motion.div
                className="bg-[#FF6B00] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl p-8 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2 font-montserrat">
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-[#0A0A0A]/70 font-montserrat">{steps[currentStep - 1].description}</p>
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2 font-mono tracking-wider">
                        NAME
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Your full name"
                        className="border-[#E5E5E5] focus:border-[#FF6B00] text-[#0A0A0A]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2 font-mono tracking-wider">
                        COMPANY
                      </label>
                      <Input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        placeholder="Company name"
                        className="border-[#E5E5E5] focus:border-[#FF6B00] text-[#0A0A0A]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2 font-mono tracking-wider">
                        EMAIL
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="your.email@company.com"
                          className={`text-[#0A0A0A] ${
                            emailError
                              ? 'border-[#FF6B00] focus:border-[#FF6B00]'
                              : 'border-[#E5E5E5] focus:border-[#FF6B00]'
                          }`}
                        />
                        {emailError && (
                          <div className="flex items-center gap-2 mt-2 text-[#FF6B00]">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-mono">{emailError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-4 font-mono tracking-wider">
                      SERVICE_TYPE
                    </label>
                    <Select value={formData.service} onValueChange={(value) => updateFormData('service', value)}>
                      <SelectTrigger className="border-[#E5E5E5] focus:border-[#FF6B00] text-[#0A0A0A]">
                        <SelectValue placeholder="Select your challenge type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-agent">AI Agent Development</SelectItem>
                        <SelectItem value="workflow">Workflow Automation</SelectItem>
                        <SelectItem value="web-system">Custom Web System</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-4 font-mono tracking-wider">
                      PROJECT_DETAILS
                    </label>
                    <Textarea
                      value={formData.details}
                      onChange={(e) => updateFormData('details', e.target.value)}
                      placeholder="Describe your project vision, goals, timeline, and any specific requirements..."
                      className="min-h-32 border-[#E5E5E5] focus:border-[#FF6B00] text-[#0A0A0A]"
                    />
                    <p className="text-xs text-[#0A0A0A]/50 mt-2 font-mono">
                      {formData.details.length}/500 characters minimum
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#E5E5E5]">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-[#E5E5E5] text-[#0A0A0A] hover:border-[#FF6B00] hover:text-[#FF6B00]"
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <motion.div
                  animate={isTyping ? {
                    boxShadow: [
                      '0 0 0 0 rgba(255, 107, 0, 0.4)',
                      '0 0 0 10px rgba(255, 107, 0, 0)',
                      '0 0 0 0 rgba(255, 107, 0, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className={`flex items-center gap-2 ${
                      isTyping
                        ? 'bg-[#FF6B00] shadow-lg shadow-[#FF6B00]/50'
                        : 'bg-[#FF6B00] hover:bg-[#FF6B00]/90'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Brief
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F5F5F5] px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-[#0A0A0A]/70">
                FORM_STATUS: {isStepValid() ? 'VALID' : 'INCOMPLETE'} | STEP: {currentStep}/{steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
