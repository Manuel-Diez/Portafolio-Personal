package com.talonario.Config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	@Value("${security.jwt.secret}")
	private String secret;

	@Value("${security.jwt.expiration-minutes}")
	private long expirationMinutes;

	private SecretKey getKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(String username, String rol) {
		Date now = new Date();
		Date expiration = new Date(now.getTime() + expirationMinutes * 60 * 1000);

		return Jwts.builder()
				.subject(username)
				.claim("rol", rol)
				.issuedAt(now)
				.expiration(expiration)
				.signWith(getKey())
				.compact();
	}

	public String extractUsername(String token) {
		return parseClaims(token).getSubject();
	}

	public String extractRol(String token) {
		return parseClaims(token).get("rol", String.class);
	}

	public boolean isTokenValid(String token) {
		try {
			Claims claims = parseClaims(token);
			return claims.getExpiration().after(new Date());
		} catch (Exception e) {
			return false;
		}
	}

	private Claims parseClaims(String token) {
		return Jwts.parser()
				.verifyWith(getKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
}
