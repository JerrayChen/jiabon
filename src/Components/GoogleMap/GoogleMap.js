import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GoogleMap.css';
class GoogleMap extends Component {
    constructor() {
        super();
        this.state = {
            map: null,
            markers: []
        }
    }

    componentDidMount() {
        // console.log(this.props.stores);
        const google = window.google;
        var latLong = new google.maps.LatLng(32.7774085, -96.7955133);

        var options = {
            zoom: 13,
            center: latLong
        };
        var map = new google.maps.Map(ReactDOM.findDOMNode(this), options);
        this.setState({
            map
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stores !== this.props.stores) {
            const google = window.google;
            let markers = this.props.stores.map(store => {
                let latLong = new google.maps.LatLng(store.latitude, store.longitude);
                let marker = new google.maps.Marker({
                    map: this.state.map,
                    position: latLong
                });
                attachSecretMessage(marker, store.name)
                return marker;
            });
            this.setState({
                markers
            })
            function attachSecretMessage(marker, secretMessage) {
                var infowindow = new google.maps.InfoWindow({
                    content: secretMessage
                });

                marker.addListener('click', function () {
                    infowindow.open(marker.get('map'), marker);
                });
            }
        }
    }

    render() {
        // const google = window.google;
        // let markers = this.props.stores.map(store => {
        //     let latLong = new google.maps.LatLng(store.latitude, store.longitude);
        //     let marker = new google.maps.Marker({
        //         map: this.state.map,
        //         position: latLong
        //     });
        //     attachSecretMessage(marker, store.name)
        //     return marker;
        // });
        // function attachSecretMessage(marker, secretMessage) {
        //     var infowindow = new google.maps.InfoWindow({
        //         content: secretMessage
        //     });

        //     marker.addListener('click', function () {
        //         infowindow.open(marker.get('map'), marker);
        //     });
        // }
        return (
            <div id='map'>
                <span>Loading Map...</span>
            </div>
        )
    }

}
export default GoogleMap;