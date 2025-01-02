import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Home protected</h2>
        <Link href="sign-up">To sign up</Link>
      </main>
    </>
  );
}
