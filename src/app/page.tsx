//import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import Swipe from "@/app/swipe/page";
import Form from 'next/form';


const Home = () => {
  return (
   <>
    <h1 className="mb-10">Binge</h1>
    <Form action="/create" className="w-full">
      {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
     
      <button className="primary" type="submit">Create a party</button>
    </Form>
    <h3 className="italic">or</h3>    
    <Form action="/join" className="w-full">
      {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
      <input name="code" className="mb-4" placeholder="Enter your code" type="text" required/>
      <button className="secondary" type="submit">Join party</button>
    </Form>
    </>
  );
}

// Temp
export default Swipe;
