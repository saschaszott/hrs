package de.wvv.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, de.wvv.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, de.wvv.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, de.wvv.domain.User.class.getName());
            createCache(cm, de.wvv.domain.Authority.class.getName());
            createCache(cm, de.wvv.domain.User.class.getName() + ".authorities");
            createCache(cm, de.wvv.domain.PersistentToken.class.getName());
            createCache(cm, de.wvv.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, de.wvv.domain.UserProfile.class.getName());
            createCache(cm, de.wvv.domain.UserProfile.class.getName() + ".interests");
            createCache(cm, de.wvv.domain.UserProfile.class.getName() + ".workingStyles");
            createCache(cm, de.wvv.domain.UserProfile.class.getName() + ".professionalExperiences");
            createCache(cm, de.wvv.domain.UserProfile.class.getName() + ".employeeStyles");
            createCache(cm, de.wvv.domain.Interest.class.getName());
            createCache(cm, de.wvv.domain.Interest.class.getName() + ".userProfiles");
            createCache(cm, de.wvv.domain.Offer.class.getName());
            createCache(cm, de.wvv.domain.Offer.class.getName() + ".companies");
            createCache(cm, de.wvv.domain.Offer.class.getName() + ".workingStyles");
            createCache(cm, de.wvv.domain.Offer.class.getName() + ".professionalExperiences");
            createCache(cm, de.wvv.domain.Offer.class.getName() + ".employeeStyles");
            createCache(cm, de.wvv.domain.Company.class.getName());
            createCache(cm, de.wvv.domain.Company.class.getName() + ".offers");
            createCache(cm, de.wvv.domain.EmployeeStyle.class.getName());
            createCache(cm, de.wvv.domain.EmployeeStyle.class.getName() + ".userProfiles");
            createCache(cm, de.wvv.domain.EmployeeStyle.class.getName() + ".offers");
            createCache(cm, de.wvv.domain.ProfessionalExperience.class.getName());
            createCache(cm, de.wvv.domain.ProfessionalExperience.class.getName() + ".userProfiles");
            createCache(cm, de.wvv.domain.ProfessionalExperience.class.getName() + ".offers");
            createCache(cm, de.wvv.domain.WorkingStyle.class.getName());
            createCache(cm, de.wvv.domain.WorkingStyle.class.getName() + ".userProfiles");
            createCache(cm, de.wvv.domain.WorkingStyle.class.getName() + ".offers");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
