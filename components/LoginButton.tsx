import Link from 'next/link';

// Reusable LoginButton component - displays the login button
const LoginButton = () => {
  return (
    <>
      <Link
        href={'/auth/login'}
        className="bg-white text-black px-6 py-1.5 text-sm font-gilroyBold rounded-full"
      >
        LOGIN
      </Link>
    </>
  );
};

export default LoginButton;