"use client";
import { useEffect, useState } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, useSession } from 'next-auth/react';
import { BuiltInProviderType } from '@node_modules/next-auth/providers';

// Reusable LoginButton component - displays the login button
const LoginButton = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <button
            key={provider.name}
            className="bg-white text-black px-6 py-1.5 text-sm font-gilroyBold rounded-full"
            onClick={() => signIn(provider.id)}
          >
            LOGIN
          </button>
        ))}
    </>
  );
};

export default LoginButton;