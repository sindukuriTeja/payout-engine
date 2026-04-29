import React from 'react';

const ProfilePage = ({ user }) => {
  const profile = user || {
    name: "Demo User",
    email: "demo@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo",
    bio: "Exploring the future of blockchain payouts.",
    wallet: "0x0000000000000000000000000000000000000000"
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 transition-all hover:shadow-indigo-100/50">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
            <div className="absolute -bottom-16 left-8">
              <img 
                src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} 
                alt={profile.name} 
                className="w-32 h-32 rounded-full border-4 border-white bg-gray-50 shadow-lg"
              />
            </div>
        </div>
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-500 font-medium">{profile.email}</p>
            </div>
            <button className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
              Edit Profile
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {profile.bio || "No bio provided yet."}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Blockchain Wallet</h2>
              <div className="bg-gray-900 p-4 rounded-xl flex items-center justify-between group cursor-pointer">
                <code className="text-indigo-300 text-sm font-mono break-all">
                  {profile.wallet}
                </code>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <p className="mt-2 text-xs text-gray-400">All payouts are securely verified on-chain using this wallet.</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Account Verification</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                KYC Verified
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                2FA Enabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
