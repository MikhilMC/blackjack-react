function TextDescription({ mainText, spanValue }) {
  return (
    <p className="text-2xl">
      {mainText}
      <span className="font-semibold">{spanValue}</span>
    </p>
  );
}

export default TextDescription;
