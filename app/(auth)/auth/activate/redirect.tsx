"use client";
import { useRouter } from "next/navigation";

const Redirect = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push('/auth/login');
  }, 3000);

  return (
    <>
    </>
  )
}
export default Redirect;