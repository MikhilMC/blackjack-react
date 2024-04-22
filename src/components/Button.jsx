function Button({ children, onAction, isDisabled }) {
  return (
    <button
      className={`${
        isDisabled ? "bg-gray-600" : "bg-blue-700"
      } text-white m-2 p-3 rounded-md border-2`}
      onClick={onAction}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
