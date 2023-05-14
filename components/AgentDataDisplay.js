import React from 'react'
import styles from "../styles/agentDataDisplay.module.css"

function AgentDataDisplay({ data, depth = 0 }) {
    const renderValue = (value, currentDepth) => {
        if (typeof value === "object") {
            return Array.isArray(value) ? (
                <div>
                    {value.map((item, index) => (
                        <span key={index}>{renderValue(item, currentDepth + 1)}</span>
                    ))}
                </div>
            ) : (
                <AgentDataDisplay data={value} depth={currentDepth + 1} />
            );
        } else {
            return JSON.stringify(value);
        }
    };

    const indentStyle = { marginLeft: `${depth * 20}px` }; // add indent based on depth

    return (
        <div className={styles.display} style={indentStyle}>
            {Object.keys(data).map((key) => (
                <div key={key} className="json-row">
                    <span className="json-key">{key}: </span>
                    <span className="json-value">
                        {renderValue(data[key], depth)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default AgentDataDisplay;
