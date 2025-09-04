import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ICONS: { [key: string]: React.ReactElement } = {
  instagram: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-14a1.5 1.5 0 0 1-1.5-1.5v-14a1.5 1.5 0 0 1 1.5-1.5h14zm-14 3h14m-12.5 3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm10.5-3.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0z" />,
  facebook: <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  whatsapp: <path strokeLinecap="round" strokeLinejoin="round" d="M21.9 17.6c-1.2-1.6-2.5-3.1-3.7-4.7-1.3-1.6-2.6-3.1-3.9-4.7a1.1 1.1 0 0 0-1.6 0c-1.3 1.6-2.6 3.1-3.9 4.7-1.2 1.6-2.5 3.1-3.7 4.7a1.2 1.2 0 0 0 1 1.9h14.5a1.2 1.2 0 0 0 1-1.9zm-8.4-1.1c-1.3-1.6-2.6-3.2-3.8-4.8l-.2-.2c-.1-.2-.1-.4 0-.6l.2-.3c1.3-1.6 2.5-3.2 3.8-4.8.4-.5.9-.5 1.3 0 1.3 1.6 2.5 3.2 3.8 4.8.1.2.1.4 0 .6-.1.1-1.3 1.6-3.8 4.8-.4.5-.9.5-1.3 0z" />,
  threads: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 0 0 10-10c0-5.52-4.48-10-10-10S2 6.48 2 12c0 3.13 1.45 5.92 3.7 7.79M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  marketplace: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />,
  copy: <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 4h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />,
  sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />,
  upload: <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12" />,
  image: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z M21 4l-4.24 4.24M15 2l3.5 3.5" />,
  text: <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3 M9 15v-4.5a2.5 2.5 0 0 1 5 0V15m-5-2h5" />,
  calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />,
  link: <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72m-5.3 5.3-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />,
  download: <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12" />,
  history: <path strokeLinecap="round" strokeLinejoin="round" d="M1 4v6h6m-9-3a9 9 0 0 1 18 0 9 9 0 0 1-18 0zM12 8v4l2 1" />,
  trash: <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-4-6-9 9v4h4l9-9-4-4z" />,
  view: <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z m11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />,
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      {ICONS[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

export default Icon;
