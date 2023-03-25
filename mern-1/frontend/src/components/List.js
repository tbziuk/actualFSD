import React, { useEffect } from "react";
import axios from "axios";
import "./List.css";

const List = (p) => {

    useEffect(() => {
        axios.get("http://localhost:8300/")
            .then(res => p.setDataMtd(res.data))
            .catch(err => console.error(err));
    }, [p]);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Imię i nazwisko</th>
                    <th>Kurs</th>
                    <th>Miasto</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {p.dataPar.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.city}</td>
                        <td>
                            <button onClick={() => p.deleteMtd(item)}>Usuń</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default List;
