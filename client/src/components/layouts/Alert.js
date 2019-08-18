import React, { Component } from "react";
import { connect } from "react-redux";

class Alert extends Component {
  render() {
    const { alerts } = this.props;
    return (
      <div>
        {alerts !== null && alerts.length > 0
          ? alerts.map(alert => {
              return (
                <div
                  key={alert.id}
                  className={`alert alert-${alert.alertType}`}
                >
                  {alert.msg}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(Alert);
