import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import Image from "next/image";

export default function Home() {
  return (
   <>
    <h1 class="mb-10">UntitledProject</h1>
    <Button text="Create a party" className="primary" />
    <h3 class="italic">or</h3>
    <div class="w-full">
    <Input className="mb-4" placeholder="Enter your code" type="text" />
    <Button text="Join party" className="secondary" />
    </div>
    </>
  );
}
