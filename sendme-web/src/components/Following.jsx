import React from 'react';


const Following = ({following}) => {
    
    return (
        <div>
            <h2 class='text-center mb-5 text-2xl'> Your Following </h2>
            {following.map(follow=> 
            <div class="pb-10 w-full">
                <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img class="object-cover w-20 h-20 rounded-full border-2 border-green-600 rounded-full" src={`http://127.0.0.1:8000${follow.user.profile.image}`} alt=""/>
                    <div class="flex-grow">
                    <h2 class="ml-10 text-gray-900 title-font font-medium">{follow.user.username}</h2>
                    <p class="ml-10 text-gray-500">{follow.user.profile.first_name} {follow.user.profile.last_name}</p>
                    </div>
                </div>
            </div>
                )}
        </div>
    );
};

export default Following;