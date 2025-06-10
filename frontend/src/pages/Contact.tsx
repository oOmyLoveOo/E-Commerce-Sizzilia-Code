const Contact = () => {
    return(
        <div className="flex justify-center items-center py-8">
            <form className="bg-pink-100 h-120 w-150 flex flex-col p-8">
                <h2 className="underline font-bold font-mono md:text-3xl text-center py-4">Contáctanos</h2>
                
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <input type="text"
                    placeholder="Name *" 
                    className="border-b outline-none flex-1"
                    />
                    <input type="Email"
                    placeholder="Email *"
                    className="border-b outline-none flex-1"
                    />
                </div>

                <input type="text"
                placeholder="Subject"
                className="border-b outline-none mt-10"
                />

                <textarea
                placeholder="Message"
                className="border-b outline-none resize-none h-32 mt-8"
                />

                <button type="submit"
                className="border-b outline-none font-bold tracking-wide hover:text-gray-600 transition self-center mt-10 py-2 px-8 cursor-pointer">
                    SEND
                </button>
            </form>
        </div>
    )
}

export default Contact;