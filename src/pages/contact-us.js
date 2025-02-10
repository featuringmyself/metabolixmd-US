import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';
import Head from 'next/head';

const ContactUs = () => {
    return (
        <div className="min-h-screen">
            <Head><title>Contact - MetabolixMD</title></Head>
            <NavBar />
            <div className="max-w-4xl mx-auto shadow-lg mt-20 p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Customer Service</h2>
                    <p className="mb-2">You can contact us for any questions, comments, or testimonials.</p>
                    <ul className="space-y-2">
                        <li><strong>Phone:</strong> US Toll-Free</li>
                        <li>1-858-4MBLXMD</li>
                        <li>1-812-5MBLXMD</li>
                        <li>1-518-6MBLXMD</li>
                        <li><strong>Email:</strong> <a href="mailto:consultant@metabolixmd.com" className="text-blue-600 hover:underline">consultant@metabolixmd.com</a></li>
                        <li><strong>Hours of Operation:</strong> 10 AM to 7 PM CST daily</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Corporate Office</h2>
                    <p>9808 Topeka Ave, Lubbock, Texas 79424</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Our Partner Pharmacies</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Grand Ave Pharmacy (GAP)</h3>
                        <p>1615 Grand Ave Pkwy #104, Pflugerville, TX 78660</p>
                        <p><strong>Phone:</strong> +1 (512) 377-1999</p>
                        <p><strong>Service Areas:</strong> Arizona, Pennsylvania, Wisconsin, Texas, Illinois</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">CasaPharma RX</h3>
                        <p>12855 Capricorn St, Stafford, Texas 77477</p>
                        <p><strong>Phone:</strong> +1 (877) 937-6868</p>
                        <p><strong>Service Areas:</strong> Georgia, New Mexico, Nevada, Alabama, Oklahoma, Michigan, Minnesota, Utah, Kentucky</p>
                    </div>
                </section>


            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
