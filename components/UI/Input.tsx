// components/ui/Input.tsx
export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-2 rounded-lg border 
        bg-gray-700 text-white 
        placeholder-gray-400 
        border-gray-600 
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
        transition
        ${props.className || ""}
      `}
    />
  );
}
