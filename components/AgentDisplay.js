import React from 'react'

export default function AgentDisplay({ agents }) {
    return (
        <>
            {agents.agents.map((agent, index) => {
                return (
                    <div key={index}>
                        <p>Agent: {agent.agentSymbol}</p>
                    </div>
                )
            })}
        </>
    )
}
