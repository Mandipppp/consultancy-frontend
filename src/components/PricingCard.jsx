// src/components/PricingPlans.jsx
import React, { useState } from 'react'

function PricingCard({ plan }) {
  // Ensure price is always present
  const price = plan.price !== undefined ? plan.price : plan.originalPrice || 0

  // Accept both 'percent' and 'percentage' for discountType
  const discountType = plan.discountType === 'percentage' ? 'percent' : plan.discountType

  // Calculate final price if there's a discount
  let finalPrice = price
  if (discountType === 'percent') {
    finalPrice = +(price * (1 - plan.discountValue / 100)).toFixed(2)
  } else if (discountType === 'amount') {
    finalPrice = +(price - plan.discountValue).toFixed(2)
  }

  // Build banner text
  let bannerText = ''
  if (discountType === 'percent') {
    bannerText = `${plan.discountValue}% OFF`
  } else if (discountType === 'amount') {
    bannerText = `Flat Rs ${plan.discountValue} OFF`
  }

  return (
    <div
      className={`
        relative flex flex-col border rounded-lg shadow-lg bg-white
        ${plan.popular ? 'border-[#2563eb] scale-105 shadow-xl' : 'border-gray-200'}
        transition-transform duration-200
      `}
    >
      {/* Discount Banner */}
      {discountType && plan.discountValue > 0 && (
        <div className="absolute top-0 left-0 bg-[#2563eb] text-white text-xs font-semibold uppercase px-3 py-1 rounded-tr-lg rounded-bl-lg shadow">
          {bannerText}
        </div>
      )}

      {/* Most Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-[#f59e42] text-white text-xs font-semibold uppercase px-3 py-1 rounded-bl-lg shadow">
          Most Popular
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-3xl font-extrabold text-center mb-4 text-gray-900">{plan.name}</h3>

        {/* Pricing */}
        <div className="text-center mb-6">
          {discountType && plan.discountValue > 0 ? (
            <div className="flex items-baseline justify-center space-x-3">
              <span className="text-gray-400 line-through text-lg">Rs {price}</span>
              <span className="text-4xl font-extrabold text-[#2563eb]">Rs {finalPrice}</span>
              <span className="text-gray-700 font-medium">/{plan.billingCycle}</span>
            </div>
          ) : (
            <div>
              <span className="text-5xl font-extrabold text-[#2563eb]">Rs {price}</span>
              <span className="text-gray-700 font-medium">/{plan.billingCycle}</span>
            </div>
          )}
        </div>

        <ul className="flex-1 space-y-3 mb-6">
          {(plan.features || []).map((feat, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-3 text-gray-800">{feat}</span>
            </li>
          ))}
        </ul>

        <button
          className="mt-auto bg-[#2563eb] text-white font-semibold py-3 rounded-lg 
                     hover:bg-[#1d4ed8] transition-colors shadow"
        >
          Choose Plan
        </button>
      </div>
    </div>
  )
}

export default PricingCard

function PricingPlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic",
      originalPrice: 1500,
      discountType: "percent",
      discountValue: 20,
      billingCycle: "month",
      popular: false,
      features: [
        "5GB Storage",
        "Email Support",
        "Basic Analytics",
        "Mobile App Access"
      ]
    },
    {
      id: 2,
      name: "Pro",
      originalPrice: 3000,
      discountType: "amount",
      discountValue: 500,
      billingCycle: "month",
      popular: true,
      features: [
        "50GB Storage",
        "Priority Support",
        "Advanced Analytics",
        "Mobile + Desktop Apps",
        "API Access",
        "Custom Integrations"
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      price: 5000,
      billingCycle: "month",
      popular: false,
      features: [
        "Unlimited Storage",
        "24/7 Phone Support",
        "Custom Analytics",
        "All Platform Access",
        "Advanced API",
        "White-label Solution",
        "Dedicated Account Manager"
      ]
    }
  ])

  // Simulate dynamic pricing updates
  const updatePricing = () => {
    setPlans(prevPlans => 
      prevPlans.map(plan => ({
        ...plan,
        discountType: Math.random() > 0.5 ? 'percent' : 'amount',
        discountValue: plan.id === 1 ? Math.floor(Math.random() * 30) + 10 : 
                      plan.id === 2 ? Math.floor(Math.random() * 800) + 200 : 0
      }))
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Flexible pricing options designed to grow with your business
        </p>
        
        {/* Demo Button */}
        <button
          onClick={updatePricing}
          className="mt-6 bg-[#38BDF8] text-white px-6 py-2 rounded-lg hover:bg-[#29a8d0] transition-colors"
        >
          🎲 Simulate Price Update
        </button>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard plan={plan} key={plan.id} />
        ))}
      </div>

      {/* Pricing Info */}
      <div className="mt-16 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">How Our Pricing Works</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-[#38BDF8] mb-2">Percentage Discounts</h4>
              <p className="text-gray-600">Get percentage-based discounts that scale with the original price. Perfect for seasonal sales and promotions.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#38BDF8] mb-2">Flat Amount Discounts</h4>
              <p className="text-gray-600">Fixed amount discounts like "Rs 500 off" provide clear savings regardless of the original price.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
