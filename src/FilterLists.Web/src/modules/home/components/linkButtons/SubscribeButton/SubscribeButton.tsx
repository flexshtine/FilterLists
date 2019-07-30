import * as React from "react";
import { ButtonProps } from "react-bootstrap";
import { LinkButton } from "../LinkButton";

interface Props {
    name: string;
    url: string;
    text?: string;
};

export const SubscribeButton = (props: Props) => {
    let buttonVariant: ButtonProps["variant"];
    let titlePrefix: string;

    if (props.url.indexOf(".onion/") > 0) {
        buttonVariant = "success";
        titlePrefix = "Tor address - ";
    } else if (props.url.indexOf("http://") === 0) {
        buttonVariant = "danger";
        titlePrefix = "Not Secure - ";
    } else {
        buttonVariant = undefined;
        titlePrefix = "";
    }

    const hrefTitle = `${encodeURIComponent(props.name)}`;
    let href;
    if (props.url.indexOf(".tpl") > 0) {
        href = `javascript:window.external.msAddTrackingProtectionList('${encodeURIComponent(props.url)}', '${hrefTitle}')`;
    } else if (props.url.indexOf(".lsrules") > 0) {
        href = `x-littlesnitch:subscribe-rules?url=${encodeURIComponent(props.url)}`;
    } else if (props.url.indexOf("?hostformat=littlesnitch") > 0) {
        href = `x-littlesnitch:subscribe-rules?url=${encodeURIComponent(props.url)}`;
    } else {
        href = `abp:subscribe?location=${encodeURIComponent(props.url)}&amp;title=${hrefTitle}`;
    };

    let title;
    if (props.url.indexOf(".tpl") > 0) {
        title = `${titlePrefix}Subscribe to ${props.name} with Internet Explorer's Tracking Protection List feature.`;
    } else if (props.url.indexOf(".lsrules") > 0) {
        title = `${titlePrefix}Subscribe to ${props.name} with Little Snitch's rule group subscription feature.`;
    } else if (props.url.indexOf("?hostformat=littlesnitch") > 0) {
        title = `${titlePrefix}Subscribe to ${props.name} with Little Snitch's rule group subscription feature.`;
    } else {
        title = `${titlePrefix}Subscribe to ${props.name} with a browser extension supporting the "abp:" protocol (e.g. uBlock Origin, Adblock Plus).`;
    };

    return props.url
        ? <LinkButton
            variant={buttonVariant}
            href={href}
            title={title}
            text={props.text || "Subscribe"} />
        : null;
};