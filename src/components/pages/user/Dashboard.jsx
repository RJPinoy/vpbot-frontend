import ChatbotToggler from "../../chatbot/ChatbotToggler";
import Footer from "../../pages/footer/Footer";

const Dashboard = () => {
    return (
        <>
            <ChatbotToggler />

            <div className="dashboard flex justify-start items-center flex-col w-full min-h-[100dvh] bg-white text-black">
                <div className="w-full flex justify-center items-center flex-col p-8 mb-8 bg-[#005CA7] text-white">
                    <h1 className="lg:w-1/3 text-center text-4xl font-bold">Bienvenue sur votre espace client Visual Planning</h1>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Dashboard;