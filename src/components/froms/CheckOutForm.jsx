import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { toast } from 'react-toastify';
import { postMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { auth } from '@/services/Auth/firebaseConfigue';

const CheckOutForm = ({ onNext }) => {
    const wrapperRef = useRef(null);
    const [address, setAddress] = useState('');
    const router = useRouter();
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        const addressComponents = results[0].address_components;

        setAddress(value);
        setCoordinates(latLng);

        addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes("country")) setValue("country", component.long_name);
            if (types.includes("administrative_area_level_1")) setValue("state", component.long_name);
            if (types.includes("locality")) setValue("city", component.long_name);
            if (types.includes("postal_code")) setValue("postalCode", component.long_name);
            if (types.includes("route")) setValue("street", component.long_name);
        });

        setValue('address', value);
    };

    const onSubmit = async (data) => {
        const deliveryAddress = {
            ...data,
            position: {
                type: 'Point',
                coordinates: [coordinates.lng, coordinates.lat]
            }
        };

        // Pass phone data to parent component through onNext
        const formData = {
            countryCode: data.countryCode,
            phoneNumber: data.phoneNumber,
            deliveryAddress
        };

        try {
            setLoading(true);
            // Get the current user's token
            const token = await auth.currentUser?.getIdToken();
            if (!token) {
                toast.error("Authentication required. Please sign in again.");
                return;
            }
            
            let res = await postMethod("/v1/order", {
                orderItems: [], // Empty array - products will be added by admin later
                deliveryAddress,
                phone: `${data.countryCode}${data.phoneNumber}` // Send combined phone number
            });
            setLoading(false);
            
            if (res.status) {
                toast.success("Order created successfully! Our team will review and assign your medication.");
                onNext(formData, "success2");
            }
        } catch (err) {
            setLoading(false);
            if (err.response?.status === 404 && err.response?.data?.message?.includes("User doesn't exist")) {
                toast.error("Please complete your profile setup first");
            } else {
                toast.error(err.message || "An error occurred during checkout");
            }
        }
    };

    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto font-tt-hoves">
            <div className="w-full md:w-[500px]">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-3xl font-semibold mb-6 text-zinc-800 text-center'>Please fill out your shipping details</h1>

                    <div className="flex gap-2 mt-20">
                        <div className="w-2/5">
                            <label>Country</label>
                            <select
                                {...register('countryCode', { required: true })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue="+1"
                            >
                                <option value="" disabled>Select</option>
                                <option value="+1">+1 (USA/Canada)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+81">+81 (Japan)</option>
                                <option value="+49">+49 (Germany)</option>
                                <option value="+33">+33 (France)</option>
                                <option value="+971">+971 (UAE)</option>
                                <option value="+86">+86 (China)</option>
                                <option value="+92">+92 (Pakistan)</option>
                                <option value="+880">+880 (Bangladesh)</option>
                                <option value="+7">+7 (Russia)</option>
                                <option value="+39">+39 (Italy)</option>
                                <option value="+34">+34 (Spain)</option>
                                <option value="+20">+20 (Egypt)</option>
                                <option value="+62">+62 (Indonesia)</option>
                                <option value="+82">+82 (South Korea)</option>
                                <option value="+234">+234 (Nigeria)</option>
                                <option value="+55">+55 (Brazil)</option>
                                <option value="+27">+27 (South Africa)</option>
                                {/* Add more as needed */}
                            </select>
                            {errors.countryCode && <p className="text-red-500 text-xs">Valid country code required</p>}
                        </div>
                        <div className="w-3/5">
                            <label>Phone Number</label>
                            <input
                                placeholder="Enter your phone number"
                                {...register('phoneNumber', { 
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter a valid 10-digit phone number"
                                    }
                                })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs">10-digit phone number required</p>}
                        </div>
                    </div>

                    <div>
                        <label>Address</label>
                        <PlacesAutocomplete
                            value={address}
                            onChange={(value) => {
                                setAddress(value);
                                setValue('address', value); // Update the form value when typing
                            }}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="relative">
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Enter your address',
                                            className: 'shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                                            name: 'address',
                                            onBlur: () => setValue('address', address), // Update the form value on blur
                                        })}
                                    />
                                    <div className={`bg-white z-10 rounded-lg ${suggestions.length > 0 && "border-2 border-zinc-300"} absolute`}>
                                        {loading ? <h6 className="f-400"></h6> : null}
                                        {suggestions.map((suggestion, index) => (
                                            <div
                                                {...getSuggestionItemProps(suggestion)}
                                                key={index}
                                                className="flex items-center p-1 pl-5 pr-5 cursor-pointer"
                                            >
                                                <h6 className="m-1 h6 f-400">{suggestion.description}</h6>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>

                        {errors.address && <p className="text-red-500 text-xs">Address is required</p>}
                    </div>

                    <div>
                        <label>Street</label>
                        <input
                            placeholder="Street"
                            {...register('street', { required: true })}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.street && <p className="text-red-500 text-xs">Street is required</p>}
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <label>City</label>
                            <input
                                placeholder="City"
                                {...register('city', { required: true })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.city && <p className="text-red-500 text-xs">City is required</p>}
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                placeholder="State"
                                {...register('state', { required: true })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.state && <p className="text-red-500 text-xs">State is required</p>}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <label>Country</label>
                            <input
                                placeholder="USA"
                                {...register('country', { required: true })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.country && <p className="text-red-500 text-xs">Country is required</p>}
                        </div>
                        <div>
                            <label>Postal Code</label>
                            <input
                                placeholder="462038"
                                {...register('postalCode', { required: true })}
                                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.postalCode && <p className="text-red-500 text-xs">enter a valid postal code</p>}
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`mt-10 hover:bg-primary/90 w-full py-3 text-white font-semibold rounded-full ${loading ? "bg-gray-400" : "bg-primary hover:bg-primary"}`}
                    >
                        {loading ? <ClipLoader size={24} color="white" /> : "Checkout"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckOutForm;
