const Dashboard = () => {
    return (
        <div className="dashboard flex justify-start items-center flex-col w-full min-h-[100dvh] bg-white text-black">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>

            <form action="" id="form-init" className="flex justify-center items-start flex-col border border-gray-300 p-4 rounded rounded-md w-2/3">
                <div className="flex justify-between items-center p-4 w-full">
                    <div className="flex justify-center items-start flex-col w-full mr-4">
                        <label htmlFor="assistantName">Assistant name : </label>
                        <input type="text" id="assistantName" name="assistantName" className="border border-gray-300 rounded rounded w-full px-2 py-1" />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full">
                        <label htmlFor="selectField">Model:</label>
                        <select id="selectField" name="selectField" className="border border-gray-300 rounded rounded-md w-full px-2 py-1">
                            <option value="option1" className="bg-[#282c34] px-2 py-1">Option 1</option>
                            <option value="option2" className="bg-[#282c34] px-2 py-1">Option 2</option>
                            <option value="option3" className="bg-[#282c34] px-2 py-1">Option 3</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center items-start flex-col w-full p-4">
                    <label htmlFor="systemInstructions">System Instructions : </label>
                    <textarea id="systemInstructions" name="systemInstructions" className="border border-gray-300 rounded rounded w-full px-2 py-1" rows="4"></textarea>
                </div>
                <button type="submit" className="m-auto mt-4">Submit</button>
            </form>
        </div>
    );
}

export default Dashboard;