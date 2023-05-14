import React from 'react'
import { useState, useEffect } from 'react'
import AgentDataDisplay from './AgentDataDisplay'
import AgentDisplay from './AgentDisplay'
import RegisterError from './RegisterError'

export default function RegisterAgent() {
    const [registerAgentFormData, setRegisterAgentFormData] = useState({
        symbol: "",
        faction: ""
    })

    const [agentData, setAgentData] = useState({
        agent: {
            accountId: "",
            symbol: "",
            headquarters: "",
            credits: 0
        },
        contract: {
            id: "",
            factionSymbol: "",
            type: "",
            terms: {
                deadline: "",
                payment: {
                    onAccepted: 0,
                    onFulfilled: 0
                },
                deliver: [{
                    tradeSymbol: "",
                    destinationSymbol: "",
                    unitsRequired: "",
                    unitsFulfilled: ""
                }]
            },
            accepted: false,
            fulfilled: false,
            expiration: ""
        },
        faction: {
            symbol: "",
            name: "",
            description: "",
            headquarters: "",
            traits: [{
                symbol: "",
                name: "",
                description: ""
            }],
        },
        ship: {
            symbol: "",
            registration: {
                name: "",
                factionSymbol: "",
                role: ""
            },
            nav: {
                systemSymbol: "",
                waypointSymbol: "",
                route: {
                    destination: {
                        symbol: "",
                        type: "",
                        systemSymbol: "",
                        x: 0,
                        y: 0
                    },
                    departure: {
                        symbol: "",
                        type: "",
                        systemSymbol: "",
                        x: 0,
                        y: 0
                    },
                    departureTime: "",
                    arrival: ""
                },
                status: "",
                flightMode: ""
            },
            crew: {
                current: 0,
                capacity: 0,
                required: 0,
                rotation: "",
                morale: 0,
                wages: 0
            },
            fuel: {
                current: 0,
                capacity: 0,
                consumed: {
                    amount: 0,
                    timestamp: ""
                }
            },

            frame: {
                symbol: "",
                name: "",
                description: "",
                moduleSlots: 0,
                mountingPoints: 0,
                fuelCapacity: 0,
                condition: 0,
                requirements: {
                    power: 0,
                    crew: 0
                }
            },
            reactor: {
                symbol: "",
                name: "",
                description: "",
                condition: 0,
                powerOutput: 0,
                requirements: {
                    crew: 0
                }
            },
            engine: {
                symbol: "",
                name: "",
                description: "",
                condition: 0,
                speed: 0,
                requirements: {
                    power: 0,
                    crew: 0
                }
            },
            modules: [
                {
                    symbol: "",
                    name: "",
                    description: "",
                    capacity: 0,
                    requirements: {
                        crew: 0,
                        power: 0,
                        slots: 0
                    }
                }
            ],
            mounts: [
                {
                    symbol: "0",
                    name: "0",
                    description: "",
                    strength: 0,
                    requirements: {
                        crew: 0,
                        power: 0
                    }
                }
            ],
            registration: {
                name: "",
                factionSymbol: "",
                role: ""
            },
            cargo: {
                capacity: 0,
                units: 0,
                inventory: [
                    {
                        symbol: "",
                        name: "",
                        description: "",
                        units: 0
                    }
                ]
            }
        },
        token: ""
    })
    const [agentRegistered, setAgentRegistered] = useState(false)

    const [registerError, setRegisterError] = useState(false);

    const [registerErrorMessage, setRegisterErrorMessage] = useState({
        code: 0,
        data: {
            symbol: [""],
            faction: [""],
        },
        message: ""
    })

    const [userAgents, setUserAgents] = useState([]);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...registerAgentFormData };
        newFormData[fieldName] = fieldValue;

        setRegisterAgentFormData(newFormData);
    };

    async function registerAgent(event) {
        event.preventDefault();

        let registerBody = {
            ...registerAgentFormData
        }

        const res = await fetch('https://api.spacetraders.io/v2/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerBody)
        });


        // Recommendation: handle errors
        if (!res.ok) {
            let errorResponse = await res.json();
            let error = errorResponse.error;
            setRegisterError(true);
            setAgentRegistered(false);

            setRegisterErrorMessage(error)
            // This will activate the closest `error.js` Error Boundary
            return;
        }

        let agentResponse = await res.json();

        let saveRes = await saveAgent(agentResponse.data)

        let userAgents = await saveRes.json();
        setUserAgents(userAgents)


        setAgentData(agentResponse.data)

        setAgentRegistered(true);
        setRegisterError(false);
    }


    async function saveAgent(agent) {

        var res = await fetch('/api/agents/add', {
            method: "post",
            body: JSON.stringify({ agentSymbol: agent.agent.symbol, agentToken: agent.token })
        })

        if (!res.ok) {
            console.log(await res.body)
            alert("UH OH!")
        }

        return res;
    }

    let agentDisplay;

    if (agentRegistered) {
        // agentDisplay = <AgentDataDisplay data={agentData} /> // Great for Debugging!
        agentDisplay = <AgentDisplay agents={userAgents} />
    } else {
        agentDisplay = <p>Please Register an Agent to get started! </p>
    }
    let errorMessage;
    if (registerError) {
        errorMessage = <RegisterError error={registerErrorMessage} />
    } else {
        errorMessage = <></>
    }

    return (
        <div>
            <form onSubmit={registerAgent}>
                <label htmlFor="agentSymbol">Agent Symbol</label><br />
                <input type="text" name='symbol' onChange={handleAddFormChange} /><br />
                <label htmlFor="faction">Faction</label><br />
                <input type="text" name='faction' placeholder='COSMIC' onChange={handleAddFormChange} /><br />
                <button type="submit">Register Agent</button>
            </form>
            <div>
                {errorMessage}
                {agentDisplay}
            </div>
        </div>
    )
}
