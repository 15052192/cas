---
layout: default
title: CAS - Google Authenticator Authentication
category: Multifactor Authentication
---

{% include variables.html %}

# JPA Google Authenticator Registration

Registration records and tokens may be kept inside a database instance via the following module:

{% include casmodule.html group="org.apereo.cas" module="cas-server-support-gauth-jpa" %}

To learn how to configure database drivers, [please see this guide](../installation/JDBC-Drivers.html).

{% include casproperties.html modules="cas-server-support-gauth-jpa" %}
