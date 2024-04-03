import {Button, Card} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom";
import React from "react";
export default function CardTemplate  (props){
    const navigate = useNavigate()
;    const header = {
        // background: "white",
        fontSize:"1.2rem",
        color:"white",

    }

    const text ={
        color:'white',
    }
    const btn = {
        background:'#3768e8',
        color:'#fff',
        borderColor:'#2e6da4'
    }
    const crd = {
        width:'19rem',
    }
    return(
        <Card style={crd}>
            <Card.Header  style={header}> {props.title}</Card.Header>
            <Card.Img
                variant="top"
                src={props.thumbnail}
                alt={props.title}
                width='100%'
                height={200}
            />
            <Card.Body>
                <Card.Text style={text}>
                    {props.bodyText}
                </Card.Text>
                <Button  style={btn} onClick={()=>navigate(props.link)}> {props.title}</Button>
                {/*<Link to={props.link}>{props.title}</Link>*/}
            </Card.Body>
        </Card> 

    )   
}

