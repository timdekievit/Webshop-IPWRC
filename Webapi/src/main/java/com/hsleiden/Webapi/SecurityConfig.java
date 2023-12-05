package com.hsleiden.Webapi;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(conf -> conf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() {
//        AuthenticationManager authenticationManager = null;
//        return new JwtAuthenticationFilter(null);
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
//        http.csrf((csrf) -> csrf.disable())
//                .authorizeRequests()
//                .requestMatchers("/api/users").hasRole("ADMIN")
//                .requestMatchers("/api/users/**").authenticated()
//                .anyRequest().permitAll()
//                .and()
//                .httpBasic(withDefaults());
//    }

//    public void configure(HttpSecurity http) throws Exception {
//        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
//        http.csrf((csrf) -> csrf.disable())
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("/api/users").hasRole("ADMIN")
//                        .requestMatchers("/api/users/**").authenticated()
//                        .anyRequest().permitAll()
//                )
//                .and()
//                .httpBasic(withDefaults());
//    }
}

