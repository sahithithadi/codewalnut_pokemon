"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";

const ModalBox = () => {
  const { id } = useParams();
  const [pokiData, setPokiData] = useState({ data: null, loading: false });

  useEffect(() => {
    setPokiData({ data: null, loading: true });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        let data = res.data;
        let pokiDetails = {
          name: data.name,
          id: data.id,
          type: data.types[0].type.name,
          species: data.species.name,
          stats: data.stats,
          abilities: data.abilities,
          image: data.sprites.front_default,
        };
        setPokiData({ data: { ...pokiDetails }, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setPokiData({ data: null, loading: false });
      });
  }, [id]);

  const renderItem = () => {
    let details = pokiData.data;
    return (
      <div className="details-container">
        <img src={details.image} />
        <div className="details">
          <div className="box">
            <div className="head">ID </div>
            <div>: ##{details.id}</div>
          </div>
          <div className="box">
            <div className="head">NAME </div>
            <div>: {details.name.toUpperCase()}</div>
          </div>
          <div className="box">
            <div className="head">TYPE</div>
            <div>: {details.type.toUpperCase()}</div>
          </div>
          <div>
            <div style={{ marginTop: "16px" }}>STATS</div>
            {details?.stats?.length > 0 ? (
              <div className="stat-container">
                {details.stats.map((each) => (
                  <>
                    <span>{`${each.stat.name} :`}</span>
                    <LinearProgress
                      value={each.base_stat}
                      variant="determinate"
                    />
                  </>
                ))}
              </div>
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {pokiData?.loading ? (
        <CircularProgress />
      ) : pokiData?.data ? (
        renderItem()
      ) : (
        <h1 style={{ fontSize: "2em" }}>{`Pokemon ${id} doesn't exist!`}</h1>
      )}
    </>
  );
};

export default ModalBox;
