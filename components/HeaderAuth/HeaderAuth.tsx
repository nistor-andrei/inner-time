interface HeaderAuthProp {
  primaryText: string;
  secondaryText: string;
}

const HeaderAuth = ({ primaryText, secondaryText }: HeaderAuthProp) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mt-4">{primaryText}</h1>
      <h2 className="text-sm text-gray-500 mt-3">{secondaryText}</h2>
    </>
  );
};

export default HeaderAuth;
