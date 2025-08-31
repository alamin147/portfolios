     {/* Current Activities Section */}
        {/* <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
            <Activity className="inline mr-3" />
            Active Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-400 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {activity.activity}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded ${
                    activity.status === "In Progress" ? "bg-yellow-600 text-black" :
                    activity.status === "Active" ? "bg-green-600 text-white" :
                    activity.status === "Classified" ? "bg-red-600 text-white" :
                    "bg-purple-600 text-white"
                  }`}>
                    {activity.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 text-sm">Progress</span>
                    <span className="text-red-400 font-mono text-sm">{activity.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-green-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${activity.completion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-green-400 font-mono text-sm">
                    ETA: {activity.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section> */}
