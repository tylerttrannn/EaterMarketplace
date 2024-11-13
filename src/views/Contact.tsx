import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function Contact() {
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
            Contact
          </h2>
          <p className="text-lg text-gray-600">
            If you would like to report any issues / any suggestions, feel free to email me at tylert6@uci.edu and I'll get back to you as quick as possible!
         </p>
        </div>



      </div>
    </>
  );
}

export default Contact;
