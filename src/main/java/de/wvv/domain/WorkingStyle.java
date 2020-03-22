package de.wvv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A WorkingStyle.
 */
@Entity
@Table(name = "working_style")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WorkingStyle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "working_style")
    private String workingStyle;

    @ManyToMany(mappedBy = "workingStyles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<UserProfile> userProfiles = new HashSet<>();

    @ManyToMany(mappedBy = "workingStyles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Offer> offers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkingStyle() {
        return workingStyle;
    }

    public WorkingStyle workingStyle(String workingStyle) {
        this.workingStyle = workingStyle;
        return this;
    }

    public void setWorkingStyle(String workingStyle) {
        this.workingStyle = workingStyle;
    }

    public Set<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public WorkingStyle userProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public WorkingStyle addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getWorkingStyles().add(this);
        return this;
    }

    public WorkingStyle removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getWorkingStyles().remove(this);
        return this;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public WorkingStyle offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public WorkingStyle addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getWorkingStyles().add(this);
        return this;
    }

    public WorkingStyle removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getWorkingStyles().remove(this);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkingStyle)) {
            return false;
        }
        return id != null && id.equals(((WorkingStyle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WorkingStyle{" +
            "id=" + getId() +
            ", workingStyle='" + getWorkingStyle() + "'" +
            "}";
    }
}
