import ProfileService from "../API/ProfileService";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching"


const Profile = () => {
    const [isDisabled, setIsDisabled] = useState(true);

    const [nickname, setNickname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [picture, setPicture] = useState('')
    const [dateofbirth, setDateofbirth] = useState('')

    const [fetchInfo] = useFetching( async() => {
        const response = await ProfileService.myProfile()   
        setBio(response.data.bio)
        setLocation(response.data.location)
        setPicture(response.data.image)
        setNickname(response.data.nickname)
        setFirstname(response.data.first_name)
        setLastname(response.data.last_name)
        setDateofbirth(response.data.date_of_birth)
        
        
    })

    useEffect( () => {
        fetchInfo()
        
    },[])


    const editProfile = function (event) {
        event.preventDefault()
        setIsDisabled(!isDisabled)
    }

    const saveProfile = function (event) {
        event.preventDefault()
        ProfileService.updateProfile(nickname, bio, location, firstname, lastname, dateofbirth)
        setIsDisabled(!isDisabled)

    }

    return (   
        <div>

            <div class="container px-5 py-24 mx-auto">
                <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col justify-between">
                    <div class="sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <img class="object-cover w-20 h-20 rounded-full border-2 border-green-600 rounded-full" src={picture} alt=""/>
                    </div>
                    
                    {!isDisabled 
                        ? <div>
                            <button onClick={saveProfile} class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100" type="">Save</button>  
                            <button onClick={editProfile} class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100" type="">Cancel</button> 
                        </div>
                        
                        :<div>
                            <button onClick={editProfile} class="h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100" type="">Edit profile</button>
                        </div>   
                    }  
                </div>
                {!isDisabled 
                ?   
                    <div>
                        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Nickname</h2>
                                <input name="nickname" type="text" onChange={e => setNickname(e.target.value)} value={nickname} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                                                <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Nickname</h2>
                                <input name="nickname" type="text" onChange={e => setNickname(e.target.value)} value={nickname} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">First name</h2>
                                <input name="first_name" type="text" onChange={e => setFirstname(e.target.value)} value={firstname} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Last name</h2>
                                <input name="last_name" type="text" onChange={e => setLastname(e.target.value)} value={lastname} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Date of birth</h2>
                                <input name="date_of_birth" type="date" onChange={e => setDateofbirth(e.target.value)} value={dateofbirth} disabled={isDisabled} class="profile-input leading-relaxed text-base"/>
                            </div>
                        </div>
                        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Location</h2>
                                <input name="location" type="text" onChange={e => setLocation(e.target.value)} value={location} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                        <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 class="text-red-500 text-lg title-font font-medium mb-2">Bio</h2>
                                <input name="bio" type="text" onChange={e => setBio(e.target.value)} value={bio} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2 border-blue-600"/>
                            </div>
                        </div>
                    </div>
                :
                <div>
                    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">Nickname</h2>
                            <input name="nickname" type="text" onChange={e => setNickname(e.target.value)} value={nickname} disabled={isDisabled} class="profile-input leading-relaxed text-base"/>
                        </div>
                    </div>
                    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">First name</h2>
                            <input name="nickname" type="text" onChange={e => setFirstname(e.target.value)} value={firstname} disabled={isDisabled} class="profile-input leading-relaxed text-base"/>
                        </div>
                    </div>
                    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">Last name</h2>
                            <input name="nickname" type="text" onChange={e => setLastname(e.target.value)} value={lastname} disabled={isDisabled} class="profile-input leading-relaxed text-base "/>
                        </div>
                    </div>
                    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">Date of birth</h2>
                            <input name="date_of_birth" type="date" onChange={e => setDateofbirth(e.target.value)} value={dateofbirth} disabled={isDisabled} class="profile-input leading-relaxed text-base border-2"/>
                        </div>
                    </div>
                    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">Location</h2>
                            <input name="location" type="text" onChange={e => setLocation(e.target.value)} value={location} disabled={isDisabled} class="profile-input leading-relaxed text-base"/>
                        </div>
                    </div>
                    <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 class="text-red-500 text-lg title-font font-medium mb-2">Bio</h2>
                            <input name="bio" type="text" onChange={e => setBio(e.target.value)} value={bio} disabled={isDisabled} class="profile-input leading-relaxed text-base"/>
                        </div>
                    </div>
                </div>
                }

            </div>
        </div>
    )

}


export default Profile;
