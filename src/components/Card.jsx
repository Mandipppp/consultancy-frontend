import React from 'react';

const Card = ({
  icon,
  title,
  value,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {children ? (
        // if you passed children, render them (e.g. language cards)
        <div className="p-5">
          {children}
        </div>
      ) : (
        // otherwise fall back to icon / title / value
        <div className="flex items-center p-4">
          {icon && (
            <div className="p-3 bg-indigo-50 rounded-full flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="ml-4 flex-1">
            {title && (
              <p className="text-gray-500 text-sm font-medium">{title}</p>
            )}
            {value && (
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {value}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
