import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { toast } from 'react-toastify';
import { postMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

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

        const payload = {
            orderItems: [],
            deliveryAddress
        };

        try {
            setLoading(true);
            let res = await postMethod("/order", payload);
            setLoading(false);
            // if (res) window.open(res?.data?.url);
            toast.success(res.message);
            if (res) {
                onNext({}, "success2")
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto font-tt-hoves">
            <div className="w-full md:w-[500px]">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-2xl mb-6 text-primary'>Please fill out your shipping details</h1>

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
