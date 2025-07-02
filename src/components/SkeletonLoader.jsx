import React from 'react';

// Base skeleton component
const Skeleton = ({ className = '', width = 'w-full', height = 'h-4', rounded = 'rounded' }) => (
  <div 
    className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${width} ${height} ${rounded} ${className}`}
    style={{
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s ease-in-out infinite'
    }}
  />
);

// Form skeleton for public forms
export const FormSkeleton = () => (
  <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
    {/* Header skeleton */}
    <div className="text-center mb-8">
      <Skeleton width="w-64" height="h-8" className="mx-auto mb-3" />
      <Skeleton width="w-96" height="h-4" className="mx-auto mb-2" />
      <Skeleton width="w-48" height="h-4" className="mx-auto" />
    </div>

    {/* Form fields skeleton */}
    <div className="space-y-6">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <Skeleton width="w-32" height="h-4" className="mb-2" />
          <Skeleton width="w-full" height="h-12" rounded="rounded-lg" />
        </div>
      ))}
    </div>

    {/* Submit button skeleton */}
    <div className="mt-8">
      <Skeleton width="w-full" height="h-12" rounded="rounded-lg" />
    </div>
  </div>
);

// Landing page skeleton
export const LandingPageSkeleton = () => (
  <div className="space-y-12">
    {/* Hero section skeleton */}
    <div className="text-center py-20">
      <Skeleton width="w-96" height="h-12" className="mx-auto mb-6" />
      <Skeleton width="w-128" height="h-6" className="mx-auto mb-4" />
      <Skeleton width="w-80" height="h-6" className="mx-auto mb-8" />
      <div className="flex justify-center space-x-4">
        <Skeleton width="w-32" height="h-12" rounded="rounded-lg" />
        <Skeleton width="w-32" height="h-12" rounded="rounded-lg" />
      </div>
    </div>

    {/* Features section skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton width="w-16" height="h-16" rounded="rounded-full" className="mx-auto mb-4" />
          <Skeleton width="w-32" height="h-6" className="mx-auto mb-2" />
          <Skeleton width="w-48" height="h-4" className="mx-auto mb-1" />
          <Skeleton width="w-40" height="h-4" className="mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

// Dashboard skeleton
export const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <Skeleton width="w-48" height="h-8" />
      <Skeleton width="w-32" height="h-10" rounded="rounded-lg" />
    </div>

    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton width="w-16" height="h-4" className="mb-2" />
              <Skeleton width="w-12" height="h-8" />
            </div>
            <Skeleton width="w-12" height="h-12" rounded="rounded-lg" />
          </div>
        </div>
      ))}
    </div>

    {/* Content area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
        <Skeleton width="w-32" height="h-6" className="mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton width="w-10" height="h-10" rounded="rounded-full" />
                <div>
                  <Skeleton width="w-32" height="h-4" className="mb-1" />
                  <Skeleton width="w-24" height="h-3" />
                </div>
              </div>
              <Skeleton width="w-16" height="h-6" rounded="rounded-full" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border">
        <Skeleton width="w-24" height="h-6" className="mb-4" />
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <Skeleton width="w-full" height="h-4" className="mb-2" />
              <Skeleton width="w-3/4" height="h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Navigation skeleton
export const NavSkeleton = () => (
  <nav className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-8">
          <Skeleton width="w-32" height="h-8" />
          <div className="hidden md:flex space-x-6">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} width="w-16" height="h-4" />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton width="w-24" height="h-9" rounded="rounded-lg" />
          <Skeleton width="w-20" height="h-9" rounded="rounded-lg" />
        </div>
      </div>
    </div>
  </nav>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    {/* Header */}
    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(columns)].map((_, index) => (
          <Skeleton key={index} width="w-24" height="h-4" />
        ))}
      </div>
    </div>
    
    {/* Rows */}
    <div className="divide-y divide-gray-200">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            {[...Array(columns)].map((_, colIndex) => (
              <Skeleton 
                key={colIndex} 
                width={colIndex === 0 ? "w-32" : colIndex === columns - 1 ? "w-20" : "w-24"} 
                height="h-4" 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Card skeleton
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton width="w-32" height="h-6" />
      <Skeleton width="w-16" height="h-8" rounded="rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-3/4" height="h-4" />
      <Skeleton width="w-1/2" height="h-4" />
    </div>
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <Skeleton width="w-20" height="h-4" />
        <Skeleton width="w-24" height="h-8" rounded="rounded-md" />
      </div>
    </div>
  </div>
);

// Add CSS for skeleton animation
const SkeletonStyles = () => (
  <style jsx>{`
    @keyframes skeleton-loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `}</style>
);

// Main export with styles
const SkeletonLoader = {
  Skeleton,
  FormSkeleton,
  LandingPageSkeleton,
  DashboardSkeleton,
  NavSkeleton,
  TableSkeleton,
  CardSkeleton,
  Styles: SkeletonStyles
};

export default SkeletonLoader; 