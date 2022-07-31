import { useFetching } from "../hooks/useFetching"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import MyLoader from "../components/UI/loader/MyLoader"
import ProfileService from "../API/ProfileService"
import { Link } from "react-router-dom"


const Profiles = () => {
    const [profiles, setProfiles] = useState([])

    const [fetchProfiles, isProfilesLoading, profileError] = useFetching( async() => {
        const response = await ProfileService.getAllProfiles()
        setProfiles([...response.data])

    })
    useEffect( () => {
        fetchProfiles()

    }, [])


    return (
        <div>
            <div className="flex justify-center my-10 text-4xl font-medium text-black-400">
                Profiles
            </div>

            {profileError &&
                <div>Error {profileError}</div>  
            }

            {isProfilesLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader/></div>
            }   

            {profiles.map(profile => 
                <Link to={`${profile.user}`}>
                    <div class="flex items-center border-gray-200 border p-4 mx-20 my-5">
                        <img class="object-cover w-20 h-20 rounded-full border-2 border-green-600 rounded-full" src={`http://127.0.0.1:8000${profile.image}`} alt=""/>
                        <div class="flex-grow">
                        <h2 class="ml-10 text-gray-900 title-font font-medium">{profile.user}</h2>
                        <p class="ml-10 text-gray-500">{profile.first_name} {profile.last_name}</p>
                        </div>
                    </div>
                </Link>  
            )}
        </div>
    )

}

export default observer(Profiles);