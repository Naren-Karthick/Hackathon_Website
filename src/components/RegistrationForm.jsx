import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { domainsData } from '../DomainsData';
import { CheckCircle2, ChevronDown, QrCode } from 'lucide-react';

const RegistrationForm = () => {
  const initialFormState = {
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    domain: '',
    problemStatement: '',
    teamSize: '3',
    member2: '',
    member3: '',
    member4: '',
    member5: '',
    member6: '',
    transactionId: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [availableProblems, setAvailableProblems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update available problem statements when domain changes
  useEffect(() => {
    if (formData.domain) {
      const selectedDomain = domainsData.find(d => d.id === formData.domain);
      setAvailableProblems(selectedDomain ? selectedDomain.problems : []);
      setFormData(prev => ({ ...prev, problemStatement: '' })); // Reset problem statement on domain change
    } else {
      setAvailableProblems([]);
    }
  }, [formData.domain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // UPI UTR validation (12 digits)
    if (!/^\d{12}$/.test(formData.transactionId)) {
      alert("Please enter a valid 12-digit UPI Transaction / UTR Number.");
      setIsSubmitting(false);
      return;
    }
    
    // Check if the Google Script URL is provided in .env
    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!scriptUrl) {
      alert("Registration failed: Google Sheets URL is missing. Please add it to your .env file.");
      setIsSubmitting(false);
      return;
    }

    // Upload Screenshot to ImgBB
    let screenshotUrl = "";
    if (paymentScreenshot) {
      const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!imgbbKey) {
        alert("Registration failed: ImgBB API key is missing. Please add VITE_IMGBB_API_KEY to your .env file.");
        setIsSubmitting(false);
        return;
      }
      
      try {
        const imgData = new FormData();
        imgData.append('image', paymentScreenshot);
        
        const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: 'POST',
          body: imgData
        });
        
        const imgResult = await imgResponse.json();
        if (imgResult.success) {
          screenshotUrl = imgResult.data.url;
        } else {
          throw new Error("ImgBB upload failed");
        }
      } catch (err) {
        console.error("Screenshot upload error:", err);
        alert("Failed to upload screenshot. Please try again.");
        setIsSubmitting(false);
        return;
      }
    } else {
      alert("Please upload a payment screenshot.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Use URLSearchParams to send data as application/x-www-form-urlencoded
      // This is the most reliable format for Google Apps Script
      const data = new URLSearchParams();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('screenshotUrl', screenshotUrl);
      data.append('timestamp', new Date().toLocaleString());

      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      // With no-cors, the response is opaque, so we can't check response.ok or read the body.
      // If the fetch doesn't throw a network error, we assume it succeeded.
      setIsSubmitted(true);
      setFormData(initialFormState);
      setPaymentScreenshot(null);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Join the <span className="neon-text">Battle</span></h2>
          <p className="text-gray-400">Register your team for IHackX. Spots are limited!</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-10 relative overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10"
        >
          {/* Success Overlay */}
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 bg-obsidian/90 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl"
            >
              <CheckCircle2 className="w-20 h-20 text-cyan mb-4 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
              <h3 className="text-3xl font-bold text-white mb-2">Registration Successful!</h3>
              <p className="text-gray-300">Your team has been registered for IHackX.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Team Name *</label>
                <input 
                  required
                  type="text" 
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                  placeholder="e.g. Cyber Ninjas"
                />
              </div>

              {/* Leader Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Team Leader Name *</label>
                <input 
                  required
                  type="text" 
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Leader Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Leader Email *</label>
                <input 
                  required
                  type="email" 
                  name="leaderEmail"
                  value={formData.leaderEmail}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Leader Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Leader Phone *</label>
                <input 
                  required
                  type="tel" 
                  name="leaderPhone"
                  value={formData.leaderPhone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                  placeholder="9952971033"
                />
              </div>
            </div>

            {/* College */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">College Name *</label>
              <input 
                required
                type="text" 
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                placeholder="e.g. Sri Muthukumaran Institute of Technology"
              />
            </div>

            {/* Domain & Problem Statement */}
            <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan">Select Domain *</label>
                <div className="relative">
                  <select
                    required
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:neon-border transition-colors cursor-pointer"
                  >
                    <option value="" disabled>-- Choose a Domain --</option>
                    {domainsData.map(domain => (
                      <option key={domain.id} value={domain.id}>{domain.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-purple">Select Problem Statement *</label>
                <div className="relative">
                  <select
                    required
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    disabled={!formData.domain}
                    className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:neon-border-purple transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>-- Choose a Problem Statement --</option>
                    {availableProblems.map(problem => (
                      <option key={problem.id} value={problem.id}>{problem.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Team Size */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Team Size *</label>
              <div className="flex space-x-4">
                {[3, 4, 5, 6].map(size => (
                  <label key={size} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="teamSize" 
                      value={size.toString()}
                      checked={formData.teamSize === size.toString()}
                      onChange={handleChange}
                      className="w-4 h-4 text-cyan bg-obsidian border-gray-600 focus:ring-cyan focus:ring-2"
                    />
                    <span className="text-gray-300">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Team Member Inputs */}
            {parseInt(formData.teamSize) > 1 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: parseInt(formData.teamSize) - 1 }).map((_, idx) => {
                    const memberNum = idx + 2;
                    const fieldName = `member${memberNum}`;
                    return (
                      <div key={fieldName} className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Member {memberNum} Name *</label>
                        <input 
                          required
                          type="text" 
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors"
                          placeholder={`Member ${memberNum} Full Name`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Section */}
            <div className="mt-8 p-6 bg-cyan/5 border border-cyan/20 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-2 rounded-xl flex-shrink-0">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=itronix@upi&pn=ITronixClub&am=150.00&cu=INR" 
                    alt="UPI QR Code" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left w-full">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Total Fee: ₹{parseInt(formData.teamSize) * 150}</h3>
                    <p className="text-sm text-gray-400">Scan to pay via any UPI app. (₹150 per person)</p>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-cyan">UPI Transaction / UTR Number *</label>
                    <input 
                      required
                      type="text" 
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      maxLength={12}
                      className="w-full bg-obsidian border border-cyan/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:neon-border transition-colors placeholder:text-gray-600"
                      placeholder="e.g. 325412345678 (12 digits)"
                    />
                  </div>
                  <div className="space-y-2 text-left pt-2">
                    <label className="text-sm font-medium text-purple">Payment Screenshot *</label>
                    <input 
                      required
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                      className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan/20 file:text-cyan hover:file:bg-cyan/30 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan to-purple text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(138,43,226,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
