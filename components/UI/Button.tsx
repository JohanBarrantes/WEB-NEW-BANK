// components/ui/Button.tsx
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="
        w-full py-2 rounded-lg 
        bg-blue-600 text-white font-semibold
        hover:bg-blue-700 transition
        disabled:bg-blue-900 disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}
