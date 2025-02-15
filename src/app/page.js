import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[url(/bg.svg)] bg-cover bg-center min-h-screen p-12">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-end sm:items-start min-h-[80vh]">
        <h1 className="text-[10rem] font-semibold text-color-900">
          curingwithCARE
        </h1>
      </main>

      <section className="row-start-2 flex flex-col gap-4   justify-center min-h-[60vh]">
        <div className="flex flex-col gap-4 items-center justify-center bg-[url(/blob.svg)] bg-cover bg-center w-[45vw] h-[45vw] rounded-full">
        <h1 className="text-7xl font-semibold text-color-900">Awareness</h1>
        </div>
      </section>

      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
