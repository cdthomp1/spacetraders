import React from 'react'
import style from "../styles/registerError.module.css"


function RegisterError({ error }) {

    const { code, data, message } = error;
    console.log("MESS", message)

    return (
        <div className={style.display}>
            <div className={style.row}>
                <span className={style.key}>code:</span>{" "}
                <span className={style.value}>{code}</span>
            </div>
            {message && (
                <div className={style.row}>
                    <span className={style.key}>message:</span>{" "}
                    <span className={style.value}>{message}</span>
                </div>
            )}
            {data.symbol?.length > 0 && (
                <div className={style.row}>
                    <span className={style.key}>symbol:</span>{" "}
                    <span className={style.value}>[{data.symbol.join(", ")}]</span>
                </div>
            )}
            {data.faction?.length > 0 && (
                <div className={style.row}>
                    <span className={style.key}>faction:</span>{" "}
                    <span className={style.value}>[{data.faction.join(", ")}]</span>
                </div>
            )}

        </div>

    )
}

export default RegisterError