import { useMap, Marker, Tooltip, Polygon } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { Typography, Divider } from '@material-ui/core'
import Icon from './Icon';

export default ({ selectedArea, isSelected, color, coordinates, areaName, totalusers, proUsers, ratio }) => {

    const [center, setCenter] = useState([]);
    const polylineRef = useRef()

    const map = useMap()

    useEffect(() => {
        if (!polylineRef.current) return
        const center = polylineRef.current.getBounds().getCenter()
        setCenter([center.lat, center.lng]);
        if (isSelected) {
            map.setView(center, 14)
        }
    }, [selectedArea])

    if (!selectedArea) return null

    return <>
        <Polygon ref={polylineRef} pathOptions={{ color: color }} positions={coordinates}>
            {center.length > 0 && < Marker position={center}
                icon={Icon}
            >
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent={isSelected} sticky >
                    <Typography variant="body2" component="h5" >{areaName}</Typography>
                    <Divider />
                    <Typography variant="caption" component="h5">Total Users: {totalusers} </Typography>
                    <Typography variant="caption" component="h5">Pro Users: {proUsers} </Typography>
                    <Typography variant="caption" component="h5">Male/Female ratio: {ratio} </Typography>
                </Tooltip>
            </Marker>
            }
        </Polygon>
    </>


}