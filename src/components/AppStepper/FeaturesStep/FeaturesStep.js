import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormattedMessage } from 'react-intl';
import { FormControl } from '@material-ui/core';

import availableFeatures from './AvailableFeatures';
import microcontrollerVersion from './MicrocontrollerVersion';
import FeaturesSelector from './FeaturesSelector';
import NextButton from '../NextButton';
import BackButton from '../BackButton';

const getFeaturesDefaultStates = (microcontroller) => {
  const defaults = {};

  availableFeatures.forEach((e) => {
    if (e.microcontroller === microcontroller || e.microcontroller === -1) {
      defaults[e.name] = e.value;

      if (e.group) {
        e.group.forEach((g) => {
          defaults[g] = e.value;
        });
      }
    }
  });

  return defaults;
};

const getFeatureGroup = (name) => {
  const filtered = availableFeatures.filter((e) => e.name === name && e.group);

  if (filtered.length > 0) {
    return filtered[0].group;
  }

  return [];
};

const getFeatureExclude = (name) => {
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.exclude
  );

  if (filtered.length > 0) {
    return filtered[0].exclude;
  }

  return [];
};

const getFeatureInclude = (name) => {
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.include
  );

  if (filtered.length > 0) {
    return filtered[0].include;
  }

  return [];
};

const getCustomParametersForFeature = (name) => {
  const filtered = availableFeatures.filter((e) => e.name === name && e.custom);
  if (filtered.length > 0) {
    return filtered[0].custom;
  }

  return '';
};

const getBuildFlagForFeature = (name) => {
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.buildflag
  );
  if (filtered.length > 0) {
    return filtered[0].buildflag;
  }

  return '';
};

const setFeature = (name, state) => {
  const newState = {};
  const group = getFeatureGroup(name);
  const custom = getCustomParametersForFeature(name);
  const buildFlag = getBuildFlagForFeature(name);

  newState[name] = state;
  group.forEach((item) => {
    newState[item] = state;
  });

  if (custom) {
    newState[`precustom_${name}`] = state ? custom : '';
  }

  if (buildFlag) {
    newState[`buildflag_${name}`] = state ? buildFlag : '';
  }
  return newState;
};

class FeaturesStep extends Component {
  constructor(props) {
    super(props);

    const defaultStates = getFeaturesDefaultStates(this.props.microcontroller);
    this.state = { options: { ...defaultStates } };
    this.state.options['microcontroller'] = this.props.microcontroller;
    this.state.options['default_envs'] = this.props.default_envs;

    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChangeCheckBox(event) {
    let featureState = setFeature(event.target.name, event.target.checked);
    const excludeGroup = getFeatureExclude(event.target.name);
    const includeGroup = getFeatureInclude(event.target.name);

    if (event.target.checked) {
      excludeGroup.forEach((item) => {
        featureState = {
          ...featureState,
          ...setFeature(item, !event.target.checked),
        };
      });
      includeGroup.forEach((item) => {
        featureState = {
          ...featureState,
          ...setFeature(item, event.target.checked),
        };
      });
    }

    this.setState((state) => {
      let newOptions = Object.assign({}, state.options);
      Object.keys(featureState).forEach((option) => {
        newOptions[option] = featureState[option];
      });
      return { options: { ...newOptions } };
    });
  }
  handleRadioChange(event) {
    const microcontroller = parseInt(event.target.value);
    const defaultStates = getFeaturesDefaultStates(microcontroller);
    this.setState({
      options: {
        microcontroller,
        default_envs: microcontrollerVersion[microcontroller].env,
        ...defaultStates,
      },
    });
  }

  handleNext() {
    const { nextHandler } = this.props;
    nextHandler({ ...this.state.options });
  }

  handleBack() {
    const { backHandler } = this.props;
    backHandler();
  }

  render() {
    const { microcontroller, ...tempState } = this.state.options;
    const { classes, nextHandler, backHandler, ...other } = this.props;
    // workaround for radiobuttons tooltips https://github.com/mui-org/material-ui/issues/13206#issuecomment-460041346
    const Wire = ({ children, ...props }) => children(props);

    return (
      <Step {...other}>
        <StepLabel>
          <FormattedMessage id="stepFeaturesTitle" />
        </StepLabel>
        <StepContent>
          <Typography>
            <FormattedMessage id="stepFeaturesMicrocontroller" />
          </Typography>
          <div className={classes.actionsContainerRadio}>
            <RadioGroup
              row
              aria-label="microcontroller"
              name="microcontroller"
              value={microcontroller.toString()}
              onChange={this.handleRadioChange}
            >
              {microcontrollerVersion.map((item, index) => {
                const { name, tooltip, show } = item;
                return (
                  show && (
                    // tooltips workaround
                    <Wire value={index.toString()} key={index}>
                      {(props) => (
                        <Tooltip
                          title={
                            tooltip ? <FormattedMessage id={tooltip} /> : ''
                          }
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label={name}
                            labelPlacement="end"
                            {...props}
                          />
                        </Tooltip>
                      )}
                    </Wire>
                  )
                );
              })}
            </RadioGroup>
            <FormHelperText>
              <FormattedMessage id="stepFeaturesMicrocontrollerHelper" />
            </FormHelperText>
          </div>

          <Typography>
            <FormattedMessage id="stepFeaturesDesc" />
          </Typography>
          <div className={classes.actionsContainer}>
            {availableFeatures.map(
              (item) =>
                item.show &&
                (item.microcontroller === microcontroller ||
                  item.microcontroller === -1) && (
                  <FeaturesSelector
                    classes={classes}
                    // value={this.state[item.name]}
                    value={tempState[item.name]}
                    item={item}
                    onChange={this.handleChangeCheckBox}
                    key={item.name}
                  />
                )
            )}
          </div>
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <BackButton disabled={false} onClick={this.handleBack} />
            </div>
            <div className={classes.wrapper}>
              <NextButton disabled={false} onClick={this.handleNext} />
            </div>
          </div>
        </StepContent>
      </Step>
    );
  }
}

FeaturesStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextHandler: PropTypes.func.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default FeaturesStep;
