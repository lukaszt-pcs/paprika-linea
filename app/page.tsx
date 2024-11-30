import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center space-y-8">
        <Image
          src="/pap_logo.png"
          alt="Paprika Studio Logo"
          width={200}
          height={200}
          priority
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold text-paprika-red">
          Welcome to Paprika Studio
        </h1>
        <div className="space-y-4">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Employee Time Logger - Track your working hours efficiently and securely using blockchain technology
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Powered by Verax Attestation Registry on Linea blockchain, ensuring transparent and immutable time tracking records
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/user">
            <Button size="lg" className="bg-paprika-red hover:bg-paprika-red-dark">
              Employee Login
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="outline">
              Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
