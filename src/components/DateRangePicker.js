import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import DefinedRange from './DefinedRange';
import { findNextRangeIndex, generateStyles } from '../utils.js';
import classnames from 'classnames';
import coreStyles from '../styles';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    const { focusedRange } = this.state;
    const { showDefinedRange } = this.props;
    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        {showDefinedRange ? (
          <DefinedRange
            focusedRange={focusedRange}
            onPreviewChange={value => this.dateRange.updatePreview(value)}
            {...this.props}
            range={this.props.ranges[focusedRange[0]]}
            className={undefined}
          />
        ) : (
          ''
        )}
        <DateRange
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          focusedRange={focusedRange}
          {...this.props}
          ref={t => (this.dateRange = t)}
          className={undefined}
        />
      </div>
    );
  }
}

DateRangePicker.defaultProps = {
  showDefinedRange: true,
};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
  showDefinedRange: PropTypes.bool,
};

export default DateRangePicker;
