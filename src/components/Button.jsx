function Button({ children, onAction, isDisabled }) {
  return (
    <button
      className={`${
        isDisabled ? "bg-gray-600" : "bg-blue-700"
      } m-2 rounded-md border-2 p-3 text-white`}
      onClick={onAction}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
