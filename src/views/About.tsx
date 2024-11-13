import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white shadow-md">
          <div>
            <h1
              className="text-3xl font-logo cursor-pointer text-indigo-600 hover:text-black"
              onClick={() => navigate('/')}
            >
              ZotMarketplace
            </h1>

            <div className="flex space-x-6 mt-2 text-gray-600">
              <h3 className="cursor-pointer hover:text-indigo-500" onClick={() => navigate('/about')}>
                About
              </h3>
              <h3 className="cursor-pointer hover:text-indigo-500" onClick={() => navigate('/contact')}>
                Contact
              </h3>
            </div>
          </div>
          <div>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>

        {/* What is ZotMarketplace Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            What is ZotMarketplace?
          </h2>
          <p className="text-lg text-gray-600">
            ZotMarketplace was created to provide a personalized and streamlined experience for buying and selling items in a world where platforms like Facebook Marketplace and Craigslist can sometimes feel overwhelming or unreliable. 
            Often, people turn to social media groups on Instagram or Reddit to post about things they are giving away or selling. 
            I created ZotMarketplace in hopes that it would create a smaller dedicated platform where fellow students can better find items people are selling.
         </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 ">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            Are you looking to add more features?
          </h2>
          <p className="text-lg text-gray-600">
            Yes, this app is very much still a work in progress and I'm always looking for things to improve for this website! 
            If you're curious as to what I'm working on for this app, there's a todo list within the 
            <span> </span>
            <a href="https://github.com/tylerttrannn/EaterMarketplace" className="text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                GitHub Repo
            </a> for this application.
           </p>

        </div>



      </div>
    </>
  );
}

export default About;
